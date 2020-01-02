/*
* 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。()  (]false
左括号必须以正确的顺序闭合。{()[]}  {(})
注意空字符串可被认为是有效字符串。""

示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true

* */

/*
* ?name={}[]()
* 请求
* {
*   [
*     name
*   ]
* }
*
* */

/*
* 栈  {-->栈  {-->}  }
* */
function isValidate(str) {//{  { }}

  //obj 规则
  let obj = {'(': ')', '[': ']', '{': '}'};
  //栈
  let stack = new Stack();

  //遍历字符串
  for (let i = 0; i < str.length; i++) {
    // console.log(str[i])
    if (obj[str[i]]) stack.push(str[i]); //
    else if (obj[stack.pop()] !== str[i]) return false;
    //放在栈中
  }
  //
  return stack.size() === 0;

}

// isValidate("{{}}}");




