import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly newcat?: string;
  readonly emailAddress?: string;
  readonly testField1?: string;
  readonly testField2?: string;
  readonly testField3?: string;
  readonly t1?: string;
  readonly t2?: string;
  readonly t3?: string;
  readonly t4?: string;
  readonly t5?: string;
  readonly t6?: string;
  readonly t7?: string;
  readonly t8?: string;
  readonly t9?: string;
  readonly t10?: string;
  readonly t11?: string;
  readonly t12?: string;
  readonly t13?: string;
  readonly t14?: string;
  readonly t15?: string;
  readonly t16?: string;
  readonly t17?: string;
  readonly t18?: string;
  readonly t19?: string;
  readonly t20?: string;
  readonly t21?: string;
  readonly t22?: string;
  readonly t23?: string;
  readonly t24?: string;
  readonly t25?: string;
  readonly t26?: string;
  readonly t27?: string;
  readonly t28?: string;
  readonly t29?: string;
  readonly t30?: string;
  readonly t31?: string;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}