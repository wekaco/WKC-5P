# edge due to hidapi-dev package
#FROM frolvlad/alpine-glibc
FROM alpine:3.8

RUN echo '@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories
RUN apk --update upgrade

ARG SC_VERSION=3.10

ENV SC_SRC_DIR=/home/supercollider-$SC_VERSION
ENV SC_BUILD_DIR=$SC_SRC_DIR/build

RUN apk --update add --no-cache build-base cmake linux-headers bsd-compat-headers

RUN apk --update add --no-cache \
  libsndfile-dev fftw avahi-dev jack-dev \
  hidapi-dev@testing eudev-dev \
  alsa-utils alsa-utils-doc alsa-lib alsaconf alsa-lib-dev alsa-plugins-jack@testing

#RUN apk --no-cache add ca-certificates wget \
#  && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
#  && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk \
  #&& apk --no-cache add glibc-2.28-r0.apk

#ARG BUILD_TYPE=Release
ARG BUILD_TYPE=RelWithDebInfo

   # && ls build \
   # && apk del libsndfile gcc cmake jack-dev fftw avahi-dev build-base cmake

WORKDIR $SC_BUILD_DIR

CMD cmake -DNATIVE=ON \
  -DSCLANG_SERVER=OFF \
  -DNO_X11=ON \
  -DCMAKE_BUILD_TYPE=$BUILD_TYPE \
  -DSC_QT=OFF \
  -DSNDFILE_LIBRARY=/usr/lib/libsndfile.so.1 \
  -DSNDFILE_INCLUDE_DIR=/usr/lib \
  -DSC_EL=NO \
#  -DAUDIOAPI=jack \
  $SC_SRC_DIR \
  && make

# /usr/lib/jack/jack_alsa.so
# /usr/lib/jack/jack_alsarawmidi.so
# RUN cmake -DNATIVE=ON -DNO_X11=ON -DCMAKE_BUILD_TYPE=$BUILD_TYPE -DSC_QT=OFF -DSNDFILE_LIBRARY=/usr/lib/libsndfile.so.1 -DSNDFILE_INCLUDE_DIR=/usr/lib $SC_SRC_DIR 
