import { Property } from './Property';

export type Builder<Properties extends object, Result = Properties> = {
  [K in keyof Required<Properties>]: Property<Builder<Properties, Result>, Properties[K]>;
} &
  (Properties extends { get: any } ? MergedGet<Properties, Result> : Get<Properties>) &
  (Properties extends { build: any } ? MergedBuild<Properties, Result> : Build<Result>);

interface MergedBuild<Properties extends { build: any }, Result> {
  /**
   * For interface it return the interface type. Be careful it's only type hinting you must previously build the object correctly
   */
  build: (() => Properties) & Property<Builder<Properties, Result>, Properties['build']>;
}

interface Build<Result> {
  /**
   * Build the object with the properties that has been already set.
   * The return type is just for type checking. It may be missing properties or fail to correctly build the object
   */
  build(): Result;
}

interface MergedGet<Properties extends { get: any }, Result> {
  get: (() => Partial<Properties>) & Property<Builder<Properties, Result>, Properties['get']>;
}

interface Get<Properties> {
  /**
   * Get the current data as plain object
   */
  get(): Partial<Properties>;
}
