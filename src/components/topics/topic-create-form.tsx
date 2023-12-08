import { createTopic } from '@/server-actions';
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@nextui-org/react';
import { useFormState } from 'react-dom';

export default function TopicCreateForm() {
  // const [formState, action] = useFormState(createTopic, { errors: [] as string[] });

  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create New Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={createTopic}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input id="name" name="name" label="Name" labelPlacement="outside" placeholder="Name" />
              <Textarea
                id="description"
                name="description"
                label="Description"
                labelPlacement="outside"
                placeholder="Describe your topic"
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
