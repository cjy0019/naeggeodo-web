import { ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '../../../modules';
import TabMenu from '../../main/TabMenu';
import CreateForm from '../CreateForm';

export default {
  title: 'create/컴포넌트',
  component: CreateForm,
  decorators: [
    (Story) => (
      <Provider store={configureStore()}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CreateForm>;

export const CreateFormStory = () => <CreateForm />;

CreateFormStory.storyName = '내꺼톡 생성 폼';
