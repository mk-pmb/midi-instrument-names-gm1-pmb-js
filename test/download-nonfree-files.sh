#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function download_nonfree_files () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m "$BASH_SOURCE"/..)"
  cd "$SELFPATH" || return $?

  local ORIG_URL='https://www.midi.org/specifications/item/gm-level-1-sound-set'
  local WARC_SNAP='http://web.archive.org/web/20170830132903/'
  local ORIG_HTML="nonfree.gm1ss.html"
  if [ ! -s "$ORIG_HTML" ]; then
    wget -O "$ORIG_HTML".part -c "$WARC_SNAP$ORIG_URL" || return $?
    mv --verbose --no-target-directory -- "$ORIG_HTML"{.part,} || return $?
  fi

  local JSON_DEST='nonfree.gm1ss.json'
  sed -nrf html2json.sed -- "$ORIG_HTML" >"$JSON_DEST" || return $?
  ls -gov -- "$JSON_DEST"
  return 0
}










[ "$1" == --lib ] && return 0; download_nonfree_files "$@"; exit $?
