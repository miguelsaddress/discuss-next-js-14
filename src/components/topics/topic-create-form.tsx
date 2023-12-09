'use client';

import { createTopic } from '@/server-actions';
import { MAX_TOPIC_DESCRIPTION_LENGTH, MAX_TOPIC_NAME_LENGTH } from '@/server-actions/create-topic-constants';
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(createTopic, { errors: {} });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onNameChange = (name: string) => {
    if (name.length <= MAX_TOPIC_NAME_LENGTH) {
      setName(name);
    }
    setName(name.substring(0, MAX_TOPIC_NAME_LENGTH));
  };

  const onDescriptionChange = (desc: string) => {
    if (description.length <= MAX_TOPIC_DESCRIPTION_LENGTH) {
      setDescription(desc);
    }
    setDescription(desc.substring(0, MAX_TOPIC_DESCRIPTION_LENGTH));
  };

  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create New Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input
                id="name"
                name="name"
                label="Name"
                labelPlacement="outside"
                placeholder="Name"
                isInvalid={!!formState.errors.name?.length}
                errorMessage={formState.errors.name?.join(', ')}
                value={name}
                onValueChange={onNameChange}
                description={`${name.length} / ${MAX_TOPIC_NAME_LENGTH}`}
              />
              <Textarea
                id="description"
                name="description"
                label="Description"
                labelPlacement="outside"
                placeholder="Describe your topic"
                isInvalid={!!formState.errors.description?.length}
                errorMessage={formState.errors.description?.join(', ')}
                value={description}
                onValueChange={onDescriptionChange}
                description={`${description.length} / ${MAX_TOPIC_DESCRIPTION_LENGTH}`}
              />

              {formState.errors._form?.length ? (
                <div className="p-2 bg-red-200 border border-red-400 rounded">
                  <ul>
                    {formState.errors._form.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
