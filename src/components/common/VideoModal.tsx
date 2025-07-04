import { useRef, useState } from "react";
import { Text, Modal } from "@mantine/core";
import { FaYoutube } from "react-icons/fa";

type TVideoModalProps = {
  src: string;
  header: string;
};

const VideoModal = ({ src, header }: TVideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setOpened(true)} className="shrink-0">
        <FaYoutube className="text-4xl mt-[2px] cursor-pointer text-primary hover:text-primary/80" />
      </button>
      <Modal
        size="xlg"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        withCloseButton={false}
        classNames={{ header: "hidden" }}
      >
        <div className="relative text-white w-full max-w-2xl mx-auto">
          {/* HTML Video Element */}
          <video
            ref={videoRef}
            src={src}
            className="w-full rounded"
            controls
            disablePictureInPicture
            controlsList="nodownload noremoteplayback noplaybackrate"
          />

          <Text
            size="lg"
            className="absolute top-2 left-4 bg-black bg-opacity-50 px-2"
          >
            {header}
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default VideoModal;
