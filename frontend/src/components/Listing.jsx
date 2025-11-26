import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Modal,
  Button
} from "@mui/material";
import { videos } from "../api/api";

export default function Listing({ category }) {

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [vids, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = (video) => {
    setCurrentVideo(video);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchVideos = async () => {
    try {
      const res = await videos(category.id);
      setVideos(res?.data || []);

      if (res?.data?.length > 0) {
        setCurrentVideo(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [category.id]);

  return (
    <Box sx={{ mb: 5 }}>
      {/* Category Name */}
      <Typography variant="h5" sx={{ mb: 2, ml: 1, fontWeight: "bold" }}>
        {category.name} Movies
      </Typography>

      {/* Thumbnails Row */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {vids.map((video, index) => (
          <Card
            key={video.id}
            sx={{
              width: 200,
              cursor: "pointer",
              border:
                currentVideo?.id === video.id
                  ? "2px solid #19305e"
                  : "1px solid #ddd",
              overflow: "hidden"
            }}
            onClick={() => handleOpen(video)}
          >
            {/* FIRST VIDEO = autoplay */}
            {index === 0 ? (
              <ReactPlayer
                url={`${BASE_URL}/${video.video_file}`}
                playing
                muted
                loop
                controls={false}
                width="100%"
                height="120px"
                style={{ backgroundColor: "#000" }}
              />
            ) : (
              <CardMedia
                component="img"
                image={`${BASE_URL}/${video.thumbnail}`}
                height="120"
                alt={video.title}
              />
            )}

            <CardContent>
              <Typography variant="body2" noWrap>
                {video.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {video.duration}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ========= MODAL POPUP VIDEO PLAYER ========= */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: "60%",
            bgcolor: "white",
            p: 3,
            mx: "auto",
            mt: "10vh",
            borderRadius: "10px"
          }}
        >
          {/* Big player */}
          <ReactPlayer
            url={`${BASE_URL}/${currentVideo?.video_file}`}
            controls
            playing
            width="100%"
            height="400px"
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            {currentVideo?.description}
          </Typography>

          {/* NEXT VIDEO BUTTON */}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              const currentIndex = vids.findIndex(
                (v) => v.id === currentVideo.id
              );
              const nextIndex = (currentIndex + 1) % vids.length;
              setCurrentVideo(vids[nextIndex]);
            }}
          >
            Next Video 
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
