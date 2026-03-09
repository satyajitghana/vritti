"use client";

import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "./component";

export default function AnimatedModalExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <Modal>
        <ModalTrigger className="bg-black text-white dark:bg-white dark:text-black rounded-lg px-6 py-3">
          Open Modal
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
              Welcome!
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              This is an animated modal with spring animations and 3D transforms.
              Click outside or press the close button to dismiss.
            </p>
          </ModalContent>
          <ModalFooter>
            <button className="rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">
              Got it
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
