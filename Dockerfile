# edge due to hidapi-dev package
FROM alpine:3.6

RUN echo '@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories
RUN apk --update upgrade

ARG SC_VERSION=3.10

ENV SC_SRC_DIR=/home/supercollider-$SC_VERSION
ENV SC_BUILD_DIR=$SC_SRC_DIR/build

RUN apk --update add --no-cache git \
  && git clone --depth 1 https://github.com/supercollider/supercollider.git $SC_SRC_DIR \
  && cd $SC_SRC_DIR \
  && git submodule init \
  && git submodule update \
  && apk del git

RUN apk --update add --no-cache build-base cmake linux-headers

RUN apk --update add --no-cache \
  libsndfile-dev fftw avahi-dev jack-dev \
  hidapi-dev@testing eudev-dev \
  alsa-utils alsa-utils-doc alsa-lib alsaconf

#ARG BUILD_TYPE=Release
ARG BUILD_TYPE=RelWithDebInfo

   # && ls build \
   # && apk del libsndfile gcc cmake jack-dev fftw avahi-dev build-base cmake

WORKDIR $SC_BUILD_DIR

RUN cmake -DNATIVE=ON \
  -DNO_X11=ON \
  -DCMAKE_BUILD_TYPE=$BUILD_TYPE \
  -DSC_QT=OFF \
  -DSNDFILE_LIBRARY=/usr/lib/libsndfile.so.1 \
  -DSNDFILE_INCLUDE_DIR=/usr/lib \
  -DALSA_LIBRARY=/usr/lib/jack/jack_alsa.so \
  -DALSA_INCLUDE_DIR=/usr/lib/jack \
  -DSC_EL=NO \
  $SC_SRC_DIR

# /usr/lib/jack/jack_alsa.so
# /usr/lib/jack/jack_alsarawmidi.so
# RUN cmake -DNATIVE=ON -DNO_X11=ON -DCMAKE_BUILD_TYPE=$BUILD_TYPE -DSC_QT=OFF -DSNDFILE_LIBRARY=/usr/lib/libsndfile.so.1 -DSNDFILE_INCLUDE_DIR=/usr/lib $SC_SRC_DIR 
