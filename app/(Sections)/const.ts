export const IntendType = {
  INTEGRATE_GAME: {
    value: '1',
    label: 'Integrate Game'
  },
  REMOVE_GAME: {
    value: '2',
    label: 'Remove Game'
  },
  WITHDRAW: {
    value: '3',
    label: 'Withdraw'
  }
};

export const reverseIntendType = Object.keys(IntendType).reduce((acc, key) => {
  const item = IntendType[key as keyof typeof IntendType]; // Type assertion here
  acc[item.value] = item.label;
  return acc;
}, {} as { [key: string]: string }); // Define the accumulator type


export const status2Label:Record<string,string> = {
  '1': 'Voting',
  '2': 'Pass',
  '3': 'Reject',
  '4': 'Revoke',
}

export const intervalTime = 20000
