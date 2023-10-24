import { Suspense } from 'react'

import { Box, IconButton, ScaleFade, Text, useBoolean } from '@chakra-ui/react'
import { PlusIcon, TagIcon, DocumentIcon } from '@heroicons/react/24/outline'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import NewRecord from 'src/components/NewRecord/NewRecord'
import NewTaskModal from 'src/components/Task/NewTaskModal/NewTaskModal'
import TodayDuration from 'src/components/TodayDuration/TodayDuration'

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
      <aside className="fixed bottom-10 right-8">
        <div className="flex flex-col-reverse items-center gap-4">
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
                  as="label"
                  pos="relative"
                  _hover={{ color: 'black' }}
                  color="gray.500"
                  display="block"
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
                    cursor="pointer"
                  >
                    {label}
                  </Text>
                </Box>
              </ScaleFade>
            )
          })}
        </div>
        <NewTaskModal isOpen={isOpenNewTaskModal} onClose={closeModal} />
      </aside>
      <main className="relative h-full">
        <Suspense fallback={<p className="bg-black">loading....</p>}>
          <NewRecord>
            {({ isRecording }) => (
              <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
                {isRecording ? (
                  <>
                    <NewRecord.Timer />
                    <div className="absolute bottom-20">
                      <NewRecord.TimerButton />
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col justify-evenly">
                    <div className="flex h-[350px] w-[350px] flex-col items-center justify-center gap-5 rounded-full border border-teal-600/70 bg-white pt-4 shadow-2xl shadow-teal-500/50">
                      <TodayDuration />
                      <NewRecord.TaskSelectField />
                    </div>
                    <div className="mx-auto">
                      <NewRecord.TimerButton />
                    </div>
                  </div>
                )}
              </div>
            )}
          </NewRecord>
        </Suspense>
      </main>
    </>
  )
}

export default HomePage
