"use client"

import {
  FamilyDrawerRoot,
  FamilyDrawerTrigger,
  FamilyDrawerPortal,
  FamilyDrawerOverlay,
  FamilyDrawerContent,
  FamilyDrawerAnimatedWrapper,
  FamilyDrawerAnimatedContent,
  FamilyDrawerClose,
  FamilyDrawerHeader,
  FamilyDrawerButton,
  useFamilyDrawer,
} from "@/registry/components/layouts/family-drawer/component"

function DefaultView() {
  const { setView } = useFamilyDrawer()
  return (
    <>
      <FamilyDrawerHeader
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        }
        title="Create New"
        description="What would you like to create today?"
      />
      <div className="mt-4 flex flex-col gap-2">
        <FamilyDrawerButton onClick={() => setView("project")}>
          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          New Project
        </FamilyDrawerButton>
        <FamilyDrawerButton onClick={() => setView("note")}>
          <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          New Note
        </FamilyDrawerButton>
      </div>
    </>
  )
}

function ProjectView() {
  const { setView } = useFamilyDrawer()
  return (
    <>
      <FamilyDrawerHeader
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
        }
        title="New Project"
        description="Enter your project details to get started."
      />
      <div className="mt-4 space-y-3">
        <input className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Project name" />
        <div className="flex gap-2">
          <button onClick={() => setView("default")} className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted" type="button">Back</button>
          <button className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90" type="button">Create</button>
        </div>
      </div>
    </>
  )
}

function NoteView() {
  const { setView } = useFamilyDrawer()
  return (
    <>
      <FamilyDrawerHeader
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
            <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        }
        title="Quick Note"
        description="Jot down a quick thought."
      />
      <div className="mt-4 space-y-3">
        <textarea className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Start typing..." rows={4} />
        <div className="flex gap-2">
          <button onClick={() => setView("default")} className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted" type="button">Back</button>
          <button className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90" type="button">Save</button>
        </div>
      </div>
    </>
  )
}

export default function FamilyDrawerExample() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <FamilyDrawerRoot>
        <FamilyDrawerTrigger>Open Drawer</FamilyDrawerTrigger>
        <FamilyDrawerPortal>
          <FamilyDrawerOverlay />
          <FamilyDrawerContent>
            <FamilyDrawerAnimatedWrapper>
              <FamilyDrawerClose />
              <FamilyDrawerAnimatedContent>
                <DefaultView />
              </FamilyDrawerAnimatedContent>
            </FamilyDrawerAnimatedWrapper>
          </FamilyDrawerContent>
        </FamilyDrawerPortal>
      </FamilyDrawerRoot>
    </div>
  )
}
