'use client';

import { createPost } from '@/server-actions';

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import FormButton from '../common/form-button';
import { MAX_POST_CONTENT_LENGTH, MAX_POST_TITLE_LENGTH } from '@/server-actions/create-post-constants';

type Props = {
  topicSlug: string;
};
export default function PostCreateForm({ topicSlug }: Props) {
  /**
   * action will have
   * - the slug as first param
   * - formState as second, and
   * - form data as third
   */
  const actionWithSlug = createPost.bind(null, topicSlug);
  const [formState, action] = useFormState(actionWithSlug, { errors: {} });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (newTitle: string) => {
    if (title.length <= MAX_POST_TITLE_LENGTH) {
      setTitle(newTitle);
    }
    setTitle(newTitle.substring(0, MAX_POST_TITLE_LENGTH));
  };

  const onContentChange = (newContent: string) => {
    if (content.length <= MAX_POST_CONTENT_LENGTH) {
      setContent(newContent);
    }
    setContent(newContent.substring(0, MAX_POST_CONTENT_LENGTH));
  };

  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create New Post</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Post in {topicSlug}</h3>
              <Input
                id="title"
                name="title"
                label="Title"
                labelPlacement="outside"
                placeholder="Title"
                isInvalid={!!formState.errors.title?.length}
                errorMessage={formState.errors.title?.join(', ')}
                value={title}
                onValueChange={onTitleChange}
                description={`${title.length} / ${MAX_POST_TITLE_LENGTH}`}
              />
              <Textarea
                id="content"
                name="content"
                label="Content"
                labelPlacement="outside"
                placeholder="Content of your post"
                isInvalid={!!formState.errors.content?.length}
                errorMessage={formState.errors.content?.join(', ')}
                value={content}
                onValueChange={onContentChange}
                description={`${content.length} / ${MAX_POST_CONTENT_LENGTH}`}
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

              <FormButton>Submit</FormButton>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
