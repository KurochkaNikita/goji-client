import { TGroceryListItem } from "types/grocery";

import { getProgressList } from "./lists";

describe("Utilities", () => {
  it("getProgressList with empty list", () => {
    const taskList: TGroceryListItem[] = [];
    const text = getProgressList(taskList);
    expect(text).toBe("Empty list");
  });

  it("getProgressList with 1 incomplited task", () => {
    const taskList: TGroceryListItem[] = [
      { id: "1", amount: 0, title: "1", completed: false },
    ];
    const text = getProgressList(taskList);
    expect(text).toBe("0/1 complited");
  });

  it("getProgressList with 1 incomplited and 1 complited tasks", () => {
    const taskList: TGroceryListItem[] = [
      { id: "1", amount: 0, title: "1", completed: false },
      { id: "2", amount: 10, title: "2", completed: true },
    ];
    const text = getProgressList(taskList);
    expect(text).toBe("1/2 complited");
  });
  it("getProgressList with 2 complited tasks ", () => {
    const taskList: TGroceryListItem[] = [
      { id: "1", amount: 0, title: "1", completed: true },
      { id: "2", amount: 10, title: "2", completed: true },
    ];
    const text = getProgressList(taskList);
    expect(text).toBe("2/2 complited");
  });

  it("getProgressList call without params", () => {
    const taskList: TGroceryListItem[] = [];
    const text = getProgressList(taskList);
    expect(text).toBe("Empty list");
  });
});
