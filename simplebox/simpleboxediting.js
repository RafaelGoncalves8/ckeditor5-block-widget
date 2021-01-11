import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

export default class SimpleBoxEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log("SimpleBoxEditing#init() got called");

    this._defineSchema();
    this._defineConverters();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("simpleBox", {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Cannot be split or left by the caret.
      allowWhere: "$block",
    });

    schema.register("simpleBoxTitle", {
      // Cannot be split or left by the caret.
      isLimit: true,
      allowIn: "simpleBox",
      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$block",
    });

    schema.register("simpleBoxDescription", {
      isLimit: true,
      allowIn: "simpleBox",
      allowContentOf: "$root",
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <simpleBox> converters
    conversion.for("upcast").elementToElement({
      model: "simpleBox",
      view: {
        name: "section",
        classes: "simple-box",
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "simpleBox",
      view: {
        name: "section",
        classes: "simple-box",
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "simpleBox",
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement("section", {
          class: "simple-box",
        });

        return toWidget(section, viewWriter, { label: "simple box widget" });
      },
    });

    // <simpleBoxTitle> converters
    conversion.for("upcast").elementToElement({
      model: "simpleBoxTitle",
      view: {
        name: "h1",
        classes: "simple-box-title",
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "simpleBoxTitle",
      view: {
        name: "h1",
        classes: "simple-box-title",
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "simpleBoxTitle",
      view: (modelElement, { writer: viewWriter }) => {
        const h1 = viewWriter.createEditableElement("h1", {
          class: "simple-box-title",
        });

        return toWidgetEditable(h1, viewWriter);
      },
    });

    // <simpleBoxDescription> converters
    conversion.for("upcast").elementToElement({
      model: "simpleBoxDescription",
      view: {
        name: "div",
        classes: "simple-box-description",
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "simpleBoxDescription",
      view: {
        name: "div",
        classes: "simple-box-description",
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "simpleBoxDescription",
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement("div", {
          class: "simple-box-description",
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
