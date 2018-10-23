FROM alpine:3.8

RUN echo '@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories
RUN apk --update upgrade

ARG SC_VERSION=3.10

ENV SC_SRC_DIR=/home/supercollider-$SC_VERSION
ENV SC_BUILD_DIR=$SC_SRC_DIR/build

ARG BUILD_TYPE=RelWithDebInfo

RUN apk --update add --no-cache \
  build-base cmake linux-headers bsd-compat-headers \
  libsndfile-dev fftw avahi-dev \
  hidapi-dev@testing eudev-dev \
  alsa-utils alsa-utils-doc alsa-lib alsaconf alsa-lib-dev portaudio-dev jack-dev \
  pulseaudio-alsa alsa-plugins-pulse@testing \
  ca-certificates git \
  && git clone --depth 1 --shallow-submodules --branch alpine https://github.com/wekaco/supercollider.git $SC_SRC_DIR && cd $SC_SRC_DIR \
  && git submodule init && git submodule update \
  && mkdir build && cd build \
  && cmake -DNATIVE=ON \
  -DSCLANG_SERVER=OFF \
  -DNO_X11=ON \
  -DCMAKE_BUILD_TYPE=$BUILD_TYPE \
  -DSC_QT=OFF \
  -DSNDFILE_LIBRARY=/usr/lib/libsndfile.so.1 \
  -DSNDFILE_INCLUDE_DIR=/usr/lib \
  -DSC_EL=NO \
  -DAUDIOAPI=portaudio \
  $SC_SRC_DIR \
  && make \
  && make install \
  && ldconfig / \
  && cd /home \
  && rm -rf $SC_SRC_DIR \
  && apk del build-base perl python cyrus-sasl-dev

COPY pulse-client.conf /etc/pulse/client.conf
COPY asound.conf /etc/asound.conf


ENV PORT 3000

EXPOSE $PORT

CMD [ "/usr/local/bin/scsynth", "-u", "$PORT" ]

WORKDIR /usr/app

