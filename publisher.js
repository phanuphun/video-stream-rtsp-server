const { spawn } = require('child_process');
require('dotenv').config();

const rtspServer = process.env.RTSP_SERVER || 'rtsp://localhost:8554/cam1';
console.log(`Streaming to: ${rtspServer}`);

const ff = spawn('ffmpeg', [

    // === Global/Input options (ก่อน -i) ===
    '-fflags', '+genpts+igndts+nobuffer',           // สร้าง PTS/DTS ใหม่ + ลด buffer
    '-flags', 'low_delay',                          // low-delay mode
    '-use_wallclock_as_timestamps', '1',            // ใช้ wallclock เป็น timestamp
    '-avoid_negative_ts', 'make_non_negative',      // TS ติดลบ → 0

    '-re',                                          // อ่าน input ตามอัตราเฟรมจริง
    '-stream_loop', '-1',                           // เล่นวนซ้ำไม่จำกัด
    '-i', 'public/videos/vdo02.mp4',                // input file

    // === Output encoding options ===
    '-c:v', 'libx264',                              // ใช้ H.264 codec
    '-preset', 'veryfast',                          // preset สำหรับการเข้ารหัส
    '-tune', 'zerolatency',                         // ปรับแต่งสำหรับการส่งสัญญาณแบบเรียลไทม์
    '-g', '50',                                     // keyframe ทุก 2 วินาที (fps=25)
    '-b:v', '300k',                                 // bitrate สำหรับวิดีโอ

    '-c:a', 'aac',                                  // ใช้ AAC codec สำหรับเสียง
    '-b:a', '96k',                                  // bitrate สำหรับเสียง

    // === Output-specific muxing options ===
    '-fps_mode', 'cfr',                             // constant frame rate
    '-muxdelay', '0',                               // ลดเวลา delay ในการ mux
    '-muxpreload', '0',                             // preload เป็น 0 เพื่อให้เริ่มส่งเร็วขึ้น

    '-rtsp_transport', 'tcp',                       // ใช้ TCP สำหรับ RTSP
    '-f', 'rtsp',                                   // ใช้ RTSP เป็น format
    rtspServer                                      // output URL
], { stdio: 'inherit' });

ff.on('spawn', () => {
    console.log(`FFmpeg process started, streaming now at ${rtspServer}`);
});

ff.on('error', err => {
    console.error('Failed to start FFmpeg:', err);
});