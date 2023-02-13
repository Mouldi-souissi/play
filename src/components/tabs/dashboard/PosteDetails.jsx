import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import console from "../../../assets/console.png";

const PosteDetails = ({ onClose, isOpen, poste }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>{poste.name}</h2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src={console} alt="consoleImg" className="consoleImg" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PosteDetails;
