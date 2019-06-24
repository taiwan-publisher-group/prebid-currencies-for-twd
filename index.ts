import * as request from "request-promise";
import * as Octokit from "@octokit/rest";

declare var process: {
  env: {
    GITHUB_OAUTH_TOKEN: string;
  };
};

const octokit = new Octokit();
const owner = "taiwan-publisher-group";
const repo = "prebid-currencies-for-twd";
const ref = "heads/master";
const path = "docs/latest.json";
const mode = "100644";
const message = `Update latest currency conversion file`;
const token = process.env.GITHUB_OAUTH_TOKEN;

octokit.authenticate({
  type: "token",
  token
});

exports.updateConversionFile = async () => {
  const body = await request("https://rate.bot.com.tw/xrt/flcsv/0/day");
  const usdInfo = body.split(/\r?\n/)[1];
  const data = {
    dataAsOf: new Date().toLocaleDateString(),
    conversions: { USD: { TWD: usdInfo.split(",")[2] } }
  };
  const lastCommit = await octokit.gitdata.getRef({ owner, repo, ref });
  const shaLastCommit = lastCommit.data.object.sha;
  const shaBaseTree = await octokit.gitdata.getCommit({
    owner,
    repo,
    commit_sha: shaLastCommit
  });
  const blob = await octokit.gitdata.createBlob({
    owner,
    repo,
    content: JSON.stringify(data)
  });
  const shaNewTree = await octokit.gitdata.createTree({
    owner,
    repo,
    base_tree: shaBaseTree.data.sha,
    tree: [{ path, mode, type: "blob", sha: blob.data.sha }]
  });
  const shaNewCommit = await octokit.gitdata.createCommit({
    owner,
    repo,
    message,
    tree: shaNewTree.data.sha,
    parents: [shaLastCommit]
  });
  const newCommit = await octokit.gitdata.updateRef({
    owner,
    repo,
    ref,
    sha: shaNewCommit.data.sha
  });
};
