# NR6-animations
Animations for the 2019 NR6 website.

# installation
```
$ yarn install
```

### running development server
```
$ yarn dev
```

### build for production
```
$ yarn build
```

# Run with Docker

###build
```
docker build -t nr6-animations .
```

### Run container
```
docker run -p 8080:1234 nr6-animations
```

## Or with docker compose
```
docker compose build
```
```
docker compose up
```

stopping
```
docker compose down
```

Open [http://localhost:8080/](http://localhost:8080/)