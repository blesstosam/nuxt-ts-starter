#!/bin/sh
repo_name="nuxt-demo"
repo_url="http://192.168.3.225/xxgd/nuxt-demo/"
# 发布的分支
deploy_branch="master"
# 部署的位置
deploy_path="/home/admin/node" 


if [ ! -d "${deploy_path}/${repo_name}" ];then
echo "--------------------------- git 初始化仓库 ------------------------"
cd ${deploy_path}
git clone ${repo_url} && git checkout ${deploy_branch} && cd ${repo_name}
else
echo "--------------------------- git pull 最新代码 ------------------------"
cd ${deploy_path}/${repo_name}
git checkout ${deploy_branch} && git pull
fi

# 使用ts-node直接启动程序
command -v pm2 >/dev/null 2>&1 || { echo >&2 "未安装pm2"; exit 1; }
echo "--------------------------- npm run publish:ts ------------------------"
pm2 start npm --name ${repo_name} -- run publish:ts

# 先打包再启动
# todo 这个不会打包koa的代码
command -v pm2 >/dev/null 2>&1 || { echo >&2 "未安装pm2"; exit 1; }
echo "--------------------------- npm run publish ---------------------------"
pm2 start npm --name ${repo_name} -- run publish
