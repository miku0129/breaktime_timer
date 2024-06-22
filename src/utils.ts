//全角から半角に変換
export const convertHankaku = (str: string): string => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };
  