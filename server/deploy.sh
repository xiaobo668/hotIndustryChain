#!/bin/bash
# ============================================================
# 腾讯云 SCF 一键部署脚本
# 用法: bash deploy.sh
# 前置条件:
#   1. 已安装腾讯云 CLI: npm install -g scfcli 或 pip install tccli
#   2. 已配置腾讯云凭证: export TENCENTCLOUD_SECRET_ID=xxx
#      export TENCENTCLOUD_SECRET_KEY=xxx
#   3. 已设置环境变量 DEEPSEEK_API_KEY（或修改下方配置）
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SCF_DIR="$SCRIPT_DIR/scf"

# ==================== 配置区（按需修改）====================
REGION="ap-guangzhou"           # 地域：ap-guangzhou(广州) ap-shanghai(上海) ap-beijing(北京)
FUNCTION_NAME="industry-chain-ai" # 函数名称
RUNTIME="Nodejs18.15"            # 运行时
HANDLER="index.main_handler"     # 执行方法
DESCRIPTION="产业链 AI 生成 API - DeepSeek"
MEMORY_SIZE=256                  # 内存 MB
TIMEOUT=30                       # 超时秒数

# 环境变量（DeepSeek API Key 必填）
DEEPSEEK_API_KEY="${DEEPSEEK_API_KEY:-}"
if [ -z "$DEEPSEEK_API_KEY" ]; then
  echo "⚠️  未检测到 DEEPSEEK_API_KEY 环境变量"
  echo "   请先设置: export DEEPSEEK_API_KEY=sk-xxxxxxxxx"
  echo "   获取地址: https://platform.deepseek.com/api_keys"
  echo ""
  read -p "是否继续部署？（API Key 可稍后在控制台设置）[y/N] " confirm
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "已取消"
    exit 0
  fi
fi

echo ""
echo "============================================="
echo "🚀 开始部署产业链 AI 服务到腾讯云 SCF"
echo "============================================="
echo "  函数名称: $FUNCTION_NAME"
echo "  地域:     $REGION"
echo "  运行时:   $RUNTIME"
echo ""

# 1. 打包代码
echo "📦 步骤 1/3: 打包云函数代码..."
ZIP_FILE="$PROJECT_ROOT/scf-deploy.zip"
cd "$SCF_DIR"
zip -r "$ZIP_FILE" index.js package.json -x "*.test.*" "__pycache__/*" ".git/*"
echo "   ✅ 打包完成: $ZIP_FILE ($(du -h "$ZIP_FILE" | cut -f1))"

# 2. 检查是否有 scfcli
if command -v scfcli &> /dev/null; then
  echo ""
  echo "📤 步骤 2/3: 使用 scfcli 部署..."

  # 创建配置文件
  cat > "$SCF_DIR/scf_config.json" << EOF
{
  "FunctionName": "$FUNCTION_NAME",
  "Description": "$DESCRIPTION",
  "Runtime": "$RUNTIME",
  "Handler": "$HANDLER",
  "CodeUri": "./",
  "MemorySize": $MEMORY_SIZE,
  "Timeout": $TIMEOUT,
  "Environment": {
    "Variables": {
      "DEEPSEEK_API_KEY": "${DEEPSEEK_API_KEY}",
      "DEEPSEEK_MODEL": "deepseek-chat",
      "CACHE_TTL": "86400"
    }
  },
  "Triggers": [
    {
      "Type": "apigw",
      "Properties": {
        "ServiceId": "",
        "Path": "/api/industry",
        "Method": "POST",
        "EnableIntegrationResponse": true
      }
    }
  ]
}
EOF

  cd "$SCF_DIR"
  scfcli deploy --config scf_config.json
  echo "   ✅ 部署成功！"

elif command -v tccli &> /dev/null; then
  echo ""
  echo "📤 步骤 2/3: 使用 tccli 部署..."

  # 上传代码到 COS（需要先创建 bucket）
  COS_BUCKET="${COS_BUCKET:-}"
  if [ -z "$COS_BUCKET" ]; then
    echo "⚠️  使用 tccli 需要提供 COS Bucket 用于存储函数代码包"
    echo "   请设置: export COS_BUCKET=your-bucket-name-appid"
    echo ""
    echo "💡 推荐使用 scfcli 方式部署，更简单：npm install -g scfcli"
    exit 1
  fi

  # 上传到 COS
  echo "   上传代码到 COS..."
  tccli cos UploadFile \
    --Bucket "$COS_BUCKET" \
    --LocalFilePath "$ZIP_FILE" \
    --Key "scf/$FUNCTION_NAME.zip" \
    --Region "$REGION"

  # 创建/更新函数
  echo "   创建/更新云函数..."
  tccli scf CreateFunction \
    --FunctionName "$FUNCTION_NAME" \
    --Runtime "$RUNTIME" \
    --Handler "$HANDLER" \
    --Code '{"CosBucketName":"'"$COS_BUCKET"'","CosObjectName":"scf/'"$FUNCTION_NAME"'.zip"}' \
    --MemorySize $MEMORY_SIZE \
    --Timeout $TIMEOUT \
    --Environment '{"Variables":{"DEEPSEEK_API_KEY":"'"$DEEPSEEK_API_KEY"'","DEEPSEEK_MODEL":"deepseek-chat"}}' \
    --Region "$REGION" || \
  tccli scf UpdateFunctionCode \
    --FunctionName "$FUNCTION_NAME" \
    --CosBucketName "$COS_BUCKET" \
    --CosObjectName "scf/$FUNCTION_NAME.zip" \
    --Region "$REGION"

  echo "   ✅ 部署成功！"

else
  echo ""
  echo "❌ 未检测到 scfcli 或 tccli"
  echo ""
  echo "请选择以下方式之一部署："
  echo ""
  echo "方式 A — scfcli（推荐）:"
  echo "  npm install -g scfcli"
  echo "  scfcli deploy"
  echo ""
  echo "方式 B — 腾讯云控制台手动部署:"
  echo "  1. 打开 https://console.cloud.tencent.com/scf"
  echo "  2. 新建 → 自定义创建 → 本地上传 ZIP 包"
  echo "  3. 将 $(basename "$ZIP_FILE") 上传即可"
  echo "  4. 配置环境变量 DEEPSEEK_API_KEY"
  echo "  5. 添加 API 网关触发器，路径 /api/industry"
  echo ""
  echo "方式 C — 安装 tccli:"
  echo "  pip install tccli"
  echo "  tccli configure  # 配置密钥"
  exit 1
fi

# 3. 输出结果
echo ""
echo "============================================="
echo "✅ 部署完成！"
echo "============================================="
echo ""
echo "接下来你需要做："
echo ""
echo "1. 在前端 index.html 中修改 API 地址："
echo "   找到 API_CONFIG.baseUrl，改为你的 API 网关地址"
echo "   例如: https://service-xxx.gz.apigw.tencentcs.com"
echo ""
echo "2. 测试接口："
echo "   curl -X POST <你的API地址>/api/industry \\"
echo '     -H "Content-Type: application/json" \\'
echo '     -d '\''{"industry":"低空经济"}'\'''
echo ""
echo "3. 如果使用 GitHub Pages 部署前端，记得推送更新后的 index.html"
echo ""
