"use client";

import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
  MentionLabel,
} from "./component";

const users = [
  { id: "1", label: "Alice Johnson" },
  { id: "2", label: "Bob Smith" },
  { id: "3", label: "Charlie Brown" },
  { id: "4", label: "Diana Prince" },
  { id: "5", label: "Eve Williams" },
];

export default function MentionExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-full max-w-md">
        <Mention>
          <MentionLabel>Post a comment</MentionLabel>
          <MentionInput placeholder="Type @ to mention someone..." />
          <MentionContent>
            {users.map((user) => (
              <MentionItem key={user.id} value={user.label}>
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {user.label[0]}
                  </div>
                  <span>{user.label}</span>
                </div>
              </MentionItem>
            ))}
          </MentionContent>
        </Mention>
      </div>
    </div>
  );
}
