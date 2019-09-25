#!/bin/bash -eu

readonly BASE_DIR_PATH="$(cd $(dirname $(dirname ${BASH_SOURCE:-$0})); pwd)"
readonly HELM_TMP_DIR_PATH="${BASE_DIR_PATH}/provisioning/tmp"
readonly HELM_ENV_FILE_PATH="${HELM_TMP_DIR_PATH}/helm.env"

readonly GIT_HASH_SHORT=$(git rev-parse --short HEAD)
readonly CURRENT_DATE=$(TZ=UTC date +%Y%m%d)
readonly DOCKER_TAG="${CURRENT_DATE}-${GIT_HASH_SHORT}"

declare with_push=''

usage_exit() {
  echo "Usage: $0 [-p]" 1>&2
  exit 1
}

while getopts ph OPT
do
  case $OPT in
    p) with_push=1
      ;;
    h) usage_exit
      ;;
    \?) usage_exit
      ;;
  esac
done

shift $((OPTIND - 1))

rm -rf "${HELM_ENV_FILE_PATH}"

for sv in frontend bff
do
  declare SV=$(echo -n ${sv} | awk '{ print toupper($0) }')
  declare DOCKER_CONTEXT_SRC_DIR="${sv}"
  declare DOCKER_CONTEXT_DIR="Dockerfile.d/${sv}"
  declare DOCKER_REPOSITORY="gcr.io/${CLOUDSDK_CORE_PROJECT}/console-${PROJECT_UUID}-${sv}"

  rm -rf ${DOCKER_CONTEXT_DIR}/source
  cp -Rp ${DOCKER_CONTEXT_SRC_DIR} ${DOCKER_CONTEXT_DIR}/source
  docker build --no-cache --target production -t ${DOCKER_REPOSITORY}:${DOCKER_TAG} ${DOCKER_CONTEXT_DIR}
  if [[ ${with_push} ]]; then
    docker push ${DOCKER_REPOSITORY}:${DOCKER_TAG}
    echo "export HELM_${SV}_IMAGE_REPOSITORY=\"${DOCKER_REPOSITORY}\"" | tee -a "${HELM_ENV_FILE_PATH}"
    echo "export HELM_${SV}_IMAGE_TAG=\"${DOCKER_TAG}\"" | tee -a "${HELM_ENV_FILE_PATH}"
  fi
  git checkout ${DOCKER_CONTEXT_DIR}/source
done
