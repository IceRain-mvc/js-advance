function func() {
  console.log(2);
}

func.before = function (current) {
  console.log(1);
  current();
  return current;
};

func.after = function (func) {
  console.log(3);
  return func;
};


func.before(func).after(func);




