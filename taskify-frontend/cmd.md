docker build \  
 --build-arg VITE_BASE_URL=http://localhost:5555/api/v1 \
 -t my-frontend .

docker run -p 5505:80 my-frontend
