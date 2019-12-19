/**
 * @fileoverview enforce every argument in function has a default value
 * @author Cao Kang
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",
        messages: {
            missDefaultValue: "parameter missing a default value."
        },
        docs: {
            description:
                "enforce every argument in function has a default value",
            category: "ECMAScript 6",
            recommended: false,
            url: "https://eslint.org/docs/rules/force-default-params"
        },
        fixable: "code",
        schema: [{}]
    },

    create(context) {

        /**
         * traverse paramNode, add properties which miss the default value to errorNodeSet
         * @param {Object | Array} paramNode current paramNode
         * @param {Set<Node>} errorNodeSet A set includes nodes missing the default value
         * @returns {null} no return
         */
        function traverseParam(paramNode, errorNodeSet) {
            if (paramNode && paramNode.type === "ObjectPattern") {
                paramNode.properties.forEach(propertyNode => {
                    const valueNode = propertyNode.value;

                    if (valueNode.type !== "AssignmentPattern" && valueNode.type !== "RestElement") {
                        errorNodeSet.add(propertyNode);
                    }
                    if (
                        valueNode.type === "AssignmentPattern" &&
                        (valueNode.left.type === "ObjectPattern" ||
                            valueNode.left.type === "ArrayPattern")
                    ) {
                        traverseParam(valueNode.left, errorNodeSet);
                    }
                    if (
                        valueNode.type === "ObjectPattern" ||
                        valueNode.type === "ArrayPattern"
                    ) {
                        traverseParam(valueNode, errorNodeSet);
                    }
                });
            }
            if (paramNode && paramNode.type === "ArrayPattern") {
                paramNode.elements.forEach(elementNode => {
                    if (!elementNode) {
                        return;
                    }
                    if (elementNode.type !== "AssignmentPattern" && elementNode.type !== "RestElement") {
                        errorNodeSet.add(elementNode);
                    }
                    if (
                        elementNode.type === "AssignmentPattern" &&
                        (elementNode.left.type === "ObjectPattern" ||
                            elementNode.left.type === "ArrayPattern")
                    ) {
                        traverseParam(elementNode.left, errorNodeSet);
                    }
                    if (
                        elementNode.type === "ObjectPattern" ||
                        elementNode.type === "ArrayPattern"
                    ) {
                        traverseParam(elementNode, errorNodeSet);
                    }
                });
            }
        }

        /**
         * check each param, report those without a default value
         * @param {FunctionDeclarationNode | FunctionExpression | ArrowFunctionExpression} FunctionNode function node
         * @returns {null} no return
         */
        function checkFunctionParam(FunctionNode) {
            const params = FunctionNode.params;
            const errorNodeSet = new Set();

            params.forEach(param => {
                if (
                    param.type !== "AssignmentPattern" &&
                    param.type !== "RestElement"
                ) {
                    errorNodeSet.add(param);
                }
                if (
                    param.type === "AssignmentPattern" &&
                    (param.left.type === "ObjectPattern" ||
                        param.left.type === "ArrayPattern")
                ) {
                    traverseParam(param.left, errorNodeSet);
                }
                if (
                    param.type === "ObjectPattern" ||
                    param.type === "ArrayPattern"
                ) {
                    traverseParam(param, errorNodeSet);
                }
            });

            errorNodeSet.forEach(errorNode => {
                context.report({
                    node: errorNode,
                    messageId: "missDefaultValue"
                });
            });
        }

        return {
            FunctionDeclaration: checkFunctionParam,
            FunctionExpression: checkFunctionParam,
            ArrowFunctionExpression: checkFunctionParam
        };
    }
};
