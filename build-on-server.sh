#!/bin/sh
repo_name="nuxt-demo"
repo_url="http://xxx.xxx.x.xxx/blesstosam/nuxt-demo/"
# 发布的分支
deploy_branch="master"
# 部署的位置
deploy_path="/home/admin/node" 

function restartPm2Script() {
  NAME=$1;
  SCRIPT=${2:-start}
  pm2 describe $NAME > /dev/null
  RUNNING=$?
  if [ "${RUNNING}" -ne 0 ]; then
    echo "start app '$NAME'..."
    pm2 start npm --name $NAME -- run $SCRIPT
  else
    echo "restart app '$NAME'..."
    pm2 restart $NAME
  fi;
}

if [ ! -d "${deploy_path}/${repo_name}" ];then
echo "--------------------------- git 初始化仓库 ------------------------"
cd ${deploy_path}
git clone ${repo_url}
echo "--------------------------- 切换到指定分支 ------------------------"
cd ${repo_name} && git checkout ${deploy_branch}
echo "--------------------------- 安装依赖 ------------------------"
npm i --registry https://registry.npm.taobao.org
else
echo "--------------------------- git pull 最新代码 ------------------------"
cd ${deploy_path}/${repo_name}
git checkout ${deploy_branch} && git pull
echo "--------------------------- 安装依赖 ------------------------"
npm i --registry https://registry.npm.taobao.org
fi


# 使用ts-node直接启动程序
command -v pm2 >/dev/null 2>&1 || { echo >&2 "未安装pm2"; exit 1; }
echo "--------------------------- npm run build:打包程序 ------------------------"
npm run build
echo "--------------------------- npm run start:ts:用ts-node启动程序 ------------------------"
restartPm2Script ${repo_name} start:ts

# 先打包再启动
# todo 这个不会打包koa的代码
# command -v pm2 >/dev/null 2>&1 || { echo >&2 "未安装pm2"; exit 1; }
# echo "--------------------------- npm run build:打包程序 ------------------------"
# npm run build
# echo "--------------------------- npm run start ---------------------------"
# restartPm2Script ${repo_name} start
