# VideoMemo front

# docker container(nginx)

## setting (./conf/default.conf)
```
upstream app {
    server  <server address>;
}
```

## build
```
docker build .
```

## run
```
docker run -p 80:80 <dockerImage>
```