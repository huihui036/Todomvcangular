import { Component } from "@angular/core";
let constdata = [
  {
    id: 1,
    title: "watch move ",
    done: true
  },
  {
    id: 2,
    title: "youwna",
    done: false
  }
];
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  title = "todoa";
  public toodlist: {
    id: number;
    title: string;
    done: boolean;
  }[] = JSON.parse(window.localStorage.getItem("todoslist") || "[]");
  public setediting: {
    id: number;
    title: string;
    done: boolean;
  } = null;
  public visibilty: string = "all";
  ngOnInit(): void {
    this.refreshdata();
    window.onhashchange = this.refreshdata.bind(this);
  }
  ngDoCheck(): void {
    window.localStorage.setItem("todoslist", JSON.stringify(this.toodlist));
  }
  // 添加内容
  addtods(e) {
    let setid = this.toodlist[this.toodlist.length - 1];
    let setvals = e.target.value.trim();
    if (setvals == "") {
      alert("请输入内容");
      return;
    }
    this.toodlist.push({
      id: setid ? setid.id + 1 : 1,
      title: setvals,
      done: false
    });
    e.target.value = "";
    console.log(this.toodlist);
  }
  get toggleAll() {
    return this.toodlist.every(ite => ite.done);
  }
  set toggleAll(val) {
    return this.toodlist.forEach(item => (item.done = val));
  }
  deltetodo(index) {
    this.toodlist.splice(index, 1);
    console.log(index);
  }
  servestods(todo, e) {
    // 保存内容
    todo.title = e.target.value;

    //失去焦点
    this.setediting = null;
  }
  handelsev(e) {
    let { keyCode } = e;
    if (keyCode == 27) {
      e.target.value = this.setediting.title;
      this.setediting = null;
    }
    console.log(keyCode);
  }
  // 完成的数量
  get todosucces() {
    return this.toodlist.filter(items => !items.done).length;
  }

  // 清除已完成
  clearaactive() {
    this.toodlist = this.toodlist.filter(item => !item.done);
  }

  //
  get filterstodo() {
    if (this.visibilty == "all") {
      return this.toodlist;
    } else if (this.visibilty == "active") {
      return this.toodlist.filter(item => !item.done);
    } else if (this.visibilty == "completed") {
      return this.toodlist.filter(item => item.done);
    }
  }
  //
  refreshdata() {
    let consha = window.location.hash.substr(1);
    switch (consha) {
      case "/":
        this.visibilty = "all";

        break;
      case "/active":
        this.visibilty = "active";
        console.log(this.visibilty);
        break;
      case "/completed":
        this.visibilty = "completed";
        break;
    }
    console.log(consha);
    console.log(this.visibilty);
  }
}
