import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScaleFade,
  Tag,
  Text,
  Wrap,
  defineStyleConfig,
  useBoolean,
} from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import NewTaskModal from 'src/components/Task/NewTaskModal/NewTaskModal'

import {
  PlusIcon,
  TagIcon,
  DocumentIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { RadioGroup } from '@headlessui/react'
import TaskForm from 'src/components/Task/TaskForm/TaskForm'

/**
 * 1. speed dial
 *    - hover -> toggle
 *    - spin icon
 */

const HomePage = () => {
  const [isOpen, { toggle }] = useBoolean()
  const [isOpenNewTaskModal, { on: openModal, off: closeModal }] = useBoolean()
  // useMemo
  const items = [
    {
      label: 'category',
      as: Link,
      to: '/categories',
      icon: TagIcon,
    },
    {
      label: 'task',
      icon: DocumentIcon,
      onClick: openModal,
    },
  ]

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Box>
        <div className="fixed bottom-10 right-8">
          <aside className="flex flex-col-reverse items-center gap-4">
            <IconButton
              aria-label="add new"
              aria-expanded={isOpen}
              aria-haspopup
              icon={<PlusIcon className="w-5" />}
              colorScheme="teal"
              shadow="md"
              isRound
              onClick={toggle}
            />
            {items.map(({ label, icon, ...buttonProps }) => {
              const _icon = React.createElement(icon, {
                className: 'w-5 stroke-slate-500 ',
                // color: 'gray',
              })
              return (
                <ScaleFade
                  in={isOpen}
                  initialScale={0.9}
                  unmountOnExit
                  key={label}
                >
                  <Box
                    pos="relative"
                    _hover={{ color: 'black' }}
                    color="gray.500"
                  >
                    <IconButton
                      aria-label={label}
                      icon={_icon}
                      colorScheme="whiteAlpha"
                      shadow="md"
                      isRound
                      {...buttonProps}
                    />
                    <Text
                      aria-hidden
                      as="span"
                      pos="absolute"
                      top="10px"
                      right="calc(100% + 10px)"
                      fontSize="sm"
                      fontWeight="medium"
                      className="first-letter:uppercase"
                    >
                      {label}
                    </Text>
                  </Box>
                </ScaleFade>
              )
            })}
          </aside>
          <Modal isOpen={isOpenNewTaskModal} onClose={closeModal}>
            <ModalContent>
              <ModalHeader>New Task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <TaskForm
                  onSave={() => undefined}
                  error={undefined}
                  loading={false}
                />
              </ModalBody>
              <ModalFooter>
                <Button>취소</Button>
                <Button>저장</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </Box>
    </>
  )
}

export default HomePage
