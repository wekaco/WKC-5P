FROM arm32v6/alpine:3.8

RUN apk --update upgrade --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ && \
   apk --update add --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ \
   alsa-utils  

ENTRYPOINT [ "/usr/bin/aplay" ]

COPY ./root /root
