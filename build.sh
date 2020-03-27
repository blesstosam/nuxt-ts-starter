#!/bin/sh
remote_ip="root@192.168.3.225"

command -v ssh >/dev/null 2>&1 || { echo >&2 "未安装ssh"; exit 1; }
echo "--------------------------- 开始执行远程脚本 ------------------------"
ssh ${remote_ip} < ./build-on-server.sh