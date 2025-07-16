# FFMPEG to RTSP server
This project is a example that how to forward video streaming to RTSP server that i used MediaMTX 

- [FFmpeg]()
- [MediaMTX]()

## Setup and Installation 
### Development 
- Installa ffmpeg and set environtment.
- Check ffmpeg version with `ffmpeg -version`.
- Create `.env` and set env variables.
- Install MediaMTX and setup `mediamtx.yml` at the root mediamtx binary(.exe).
- Open cmd and run `./mediamtx` to start MediaMTX server.
- Navigate to the root project and run `npm install` to install dependencies.
- Run `node publisher.js` for start straming vdo02.mp4 to rtsp server.

### Docker 
- Run `docker compose up -d --build` at the root project.

### RTSP Client
- After installed and straming video, user `ffplay rtsp://<host>:8554/cam1` or use VLC player to play RTSP streaming.
