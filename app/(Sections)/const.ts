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

export const getReverseIntendType = (intend: string) => {
  switch (intend) {
    case '1':
      return 'Integrate Game';
    case '2':
      return 'Remove Game';
    default:
      return 'Withdraw';
  }
}

export function multiplyByTenPowEighteen(number: number) {
  let [integer, fraction] = number.toString().split('.');
  if (fraction) {
    const requiredZeros = 18 - fraction.length;
    if (requiredZeros > 0) {
      return integer + fraction + '0'.repeat(requiredZeros);
    } else {
      return integer + fraction.slice(0, 18) + '.' + fraction.slice(18);
    }
  } else {
    return integer + '0'.repeat(18);
  }
}

export function divideByTenPowEighteen(number: number) {
  let strNum = number.toString();
  let len = strNum.length;

  if (len <= 18) {
    return '0.' + '0'.repeat(18 - len) + strNum;
  } else {
    return strNum.slice(0, len - 18) + '.' + strNum.slice(len - 18);
  }
}


export function divideHugeNumberBy1e18(numberStr: string): number | string {
  // 检查是否为有效字符串
  if (!numberStr || isNaN(Number(numberStr))) {
      return 'Invalid number';
  }

  // 提取前18位数字进行除法计算
  const DIVISOR: number = 1e18;
  let partToDivide: string = numberStr.length > 18 ? numberStr.substring(0, 18) : numberStr;
  let result: number = parseInt(partToDivide, 10) / DIVISOR;

  // 处理小数点后面的数字
  if (numberStr.length > 18) {
      // 添加小数点后面的数字
      let decimalPart: string = numberStr.substring(18);
      result = parseFloat(result.toString() + '.' + decimalPart);
  }

  return result;
}

export const status2Label:Record<string,string> = {
  '1': 'Voting',
  '2': 'Pass',
  '3': 'Reject',
  '4': 'Revoke',
}

export const intervalTime = 20000
