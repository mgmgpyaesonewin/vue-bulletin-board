import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import vuetify from '@/plugins/vuetify';

import LoginView from '@/views/LoginView.vue';

describe('LoginView', () => {
  it('renders properly', async () => {
    const wrapper = mount(LoginView as any, {
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.text()).toContain('Login');
  });
});
