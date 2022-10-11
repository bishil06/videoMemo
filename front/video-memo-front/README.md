# VideoMemo front

# docker container(nginx)

## setting (./conf/default.conf)
```
upstream app {
    server  <server address>;
}
```

if localhost access
```
upstream app {
    server  host.docker.internal:8080;
}
```


## build
```
docker build .
```

## run
```
docker run -d -p 80:80 <dockerImage>
```

if localhost access
```
docker run -d --add-host=host.docker.internal:host-gateway -p 80:80 <dockerImage>
```