var VueRuntimeDOM = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/runtime-dom/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    creatRenderer: () => createRenderer,
    h: () => h,
    render: () => render
  });

  // packages/shared/src/index.ts
  var isObject = (value) => {
    return value != null && (typeof value == "object" || typeof value == "function");
  };
  var isString = (value) => {
    return typeof value === "string";
  };
  var isArray = Array.isArray;

  // packages/runtime-core/src/renderer.ts
  function createRenderer(renderOptions2) {
    const render2 = (vnode, container) => {
      let {
        insert: hostInsert,
        romove: hostRemove,
        setElementText: hostSetElementText,
        setText: hostSetText,
        parentNode: hostParentNode,
        nextSibling: hostNextsibling,
        createElement: hostCreatElement,
        createText: hostCreatText,
        patchProp: hostPatchProp
      } = renderOptions2;
      const mountChildren = (children, container2) => {
        for (let i = 0; i < children.length; i++) {
          patch(null, children[i], container2);
        }
      };
      const mountElement = (vnode2, contianer) => {
        let { type, props, children, shapeFlag } = vnode2;
        let el = vnode2.el = hostCreatElement(type);
        if (props) {
          for (let key in props) {
            hostPatchProp(el, key, null, props[key]);
          }
        }
        if (shapeFlag & 8 /* TEXT_CHILDREN */) {
          hostSetElementText(el, children);
        } else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
          mountChildren(children, container);
        }
        hostInsert(el, container);
      };
      const patch = (n1, n2, contianer) => {
        if (n1 === n2)
          return;
        if (n1 === null) {
          mountElement(n2, contianer);
        } else {
        }
      };
      if (vnode === null) {
      } else {
        patch(container._vnode || null, vnode, container);
      }
      container._vnode = vnode;
    };
    return { render: render2 };
  }

  // packages/runtime-core/src/vnode.ts
  function isVnode(value) {
    return !!(value && value.__v_isVnode);
  }
  function creatVnode(type, props, children = null) {
    let shapeFlag = isString(type) ? 1 /* ELEMENT */ : 0;
    const vnode = {
      type,
      props,
      el: null,
      children,
      key: props == null ? void 0 : props["key"],
      __v_isVnode: true,
      shapeFlag
    };
    if (children) {
      let types = 0;
      if (isArray(children)) {
        types = 16 /* ARRAY_CHILDREN */;
      } else {
        children = String(children);
        types = 8 /* TEXT_CHILDREN */;
      }
      vnode.shapeFlag |= types;
    }
    return vnode;
  }

  // packages/runtime-core/src/h.ts
  function h(type, propsChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject(propsChildren) && !isArray(propsChildren)) {
        if (isVnode(propsChildren)) {
          return creatVnode(type, null, [propsChildren]);
        }
        return creatVnode(type, propsChildren);
      } else {
        return creatVnode(type, null, propsChildren);
      }
    } else {
      if (l > 3) {
        children = Array.from(arguments).slice(2);
      } else if (l === 3) {
        children = children;
      }
      return creatVnode(type, propsChildren, children);
    }
  }

  // packages/runtime-dom/src/nodeOps.ts
  var nodeOps = {
    insert(child, parent, anchor = null) {
      parent.insertBefore(child, anchor);
    },
    createElement(tagName) {
      return document.createElement(tagName);
    },
    creatText(text) {
      return document.createTextNode(text);
    },
    remove(child) {
      const parentNode = child.parentNode;
      if (parentNode) {
        parentNode.removeChild(child);
      }
    },
    setElementText(el, text) {
      el.textContent = text;
    },
    setText(node, text) {
      node.nodeValue = text;
    },
    querySelector(selector) {
      return document.querySelector(selector);
    },
    parentNode(node) {
      return node.parentNode;
    },
    nextSibling(node) {
      return node.nextSibling;
    }
  };

  // packages/runtime-dom/src/modules/attr.ts
  function patchAttr(el, key, nextValue) {
    if (nextValue) {
      el.setAttribute(key, nextValue);
    } else {
      el.removeAttribute(key);
    }
  }

  // packages/runtime-dom/src/modules/class.ts
  function patchClass(el, nextValue) {
    if (nextValue === null) {
      el.removeAttribute("class");
    } else {
      el.className = nextValue;
    }
  }

  // packages/runtime-dom/src/modules/event.ts
  function creatInvoker(nextValue) {
    const invoker = (e) => invoker.value(e);
    invoker.value = nextValue;
    return invoker;
  }
  function patchEvent(el, eventName, nextValue) {
    let invokers = el._vei || (el._vei = {});
    let exits = invokers[eventName];
    if (exits && nextValue) {
      exits.value = nextValue;
    } else {
      let event = eventName.slice(2).toLowerCase();
      if (nextValue) {
        const invoker = invokers[eventName] = creatInvoker(nextValue);
        el.addEventListener(event, invoker);
      } else if (exits) {
        el.removeEventListener(event, exits);
        invokers[eventName] = void 0;
      }
    }
  }

  // packages/runtime-dom/src/modules/style.ts
  function patchStyle(el, preValue, nextValue) {
    for (let key in nextValue) {
      el.style[key] = nextValue[key];
    }
    if ([preValue]) {
      for (let key in preValue) {
        if (nextValue.style[key] === null) {
          el.style[key] = null;
        }
      }
    }
  }

  // packages/runtime-dom/src/patchProp.ts
  function patchProp(el, key, preValue, nextValue) {
    if (key === "class") {
      patchClass(el, nextValue);
    } else if (key === "style") {
      patchStyle(el, preValue, nextValue);
    } else if (/^on[a-z]/.test(key)) {
      patchEvent(el, key, nextValue);
    } else {
      patchAttr(el, key, nextValue);
    }
  }

  // packages/runtime-dom/src/index.ts
  var renderOptions = Object.assign(nodeOps, { patchProp });
  function render(vnode, contianer) {
    createRenderer(renderOptions).render(vnode, contianer);
  }
  console.log(renderOptions);
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=runtime-dom.global.js.map
