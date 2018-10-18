FROM alpine:3.8

RUN echo '@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories
RUN apk --update upgrade

ARG SC_VERSION=3.10

ENV SC_SRC_DIR=/home/supercollider-$SC_VERSION
ENV SC_BUILD_DIR=$SC_SRC_DIR/build

RUN apk --update add --no-cache \
  build-base cmake linux-headers bsd-compat-headers \
  libsndfile-dev fftw avahi-dev jack-dev \
  hidapi-dev@testing eudev-dev \
  alsa-utils alsa-utils-doc alsa-lib alsaconf alsa-lib-dev alsa-plugins-jack@testing

RUN apk --no-cache add ca-certificates git \
  && git clone --depth 1 --shallow-submodules --branch alpine https://github.com/wekaco/supercollider.git $SC_SRC_DIR && cd $SC_SRC_DIR \
  && git submodule init && git submodule update \
  && mkdir build

#ARG BUILD_TYPE=Release
ARG BUILD_TYPE=RelWithDebInfo

WORKDIR $SC_BUILD_DIR

RUN cmake -DNATIVE=ON \
  -DSCLANG_SERVER=OFF \
  -DNO_X11=ON \
  -DCMAKE_BUILD_TYPE=$BUILD_TYPE \
  -DSC_QT=OFF \
  -DSNDFILE_LIBRARY=/usr/lib/libsndfile.so.1 \
  -DSNDFILE_INCLUDE_DIR=/usr/lib \
  -DSC_EL=NO \
  $SC_SRC_DIR \
  && make
