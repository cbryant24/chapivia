export const user = { 
  id: 0,
  name: 'Kanye', 
  email: 'kanye@west.com', 
  password: 'abc12345', 
  confirmPassword: 'abc12345'
};

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper
export async function actWait(amount = 0) {
  await act(async () => {
    await wait(amount);
  });
}

// Use this in your test after mounting if you want the query to finish and update the wrapper
export async function updateWrapper(wrapper, amount = 0) {
  await act(async () => {
    await wait(amount);
    wrapper.update();
  });
}