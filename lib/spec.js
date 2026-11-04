import { z } from "zod";
import { defineDomain } from "@deepseek-ai/dsh-storage-domain";
//#region packages/workspace/session-categories/src/spec.ts
/**
* Durable document validation and storage-domain declaration for Session categories.
* @module @deepseek-ai/dsh-session-categories/src/spec
*/
const nonNegativeSafeInteger = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const categoryId = z.string().min(1).transform((value) => value);
const operationId = z.string().min(1).transform((value) => value);
const sessionId = z.string().min(1).transform((value) => value);
const workspaceId = z.string().min(1).transform((value) => value);
const sessionCategorySchema = z.object({
	id: categoryId,
	workspaceId,
	parentId: categoryId.nullable(),
	title: z.string(),
	order: nonNegativeSafeInteger
});
const sessionCategoryAssignmentSchema = z.object({
	sessionId,
	categoryId
});
const pendingCategoryArchiveSchema = z.object({
	operationId,
	categoryIds: z.array(categoryId),
	sessionIds: z.array(sessionId)
});
/** Runtime validator for the complete durable Session category document. */
const sessionCategoryDocumentSchema = z.object({
	version: z.literal(1),
	revision: nonNegativeSafeInteger,
	categories: z.array(sessionCategorySchema),
	assignments: z.array(sessionCategoryAssignmentSchema),
	pendingArchive: z.array(pendingCategoryArchiveSchema)
}).superRefine((document, ctx) => {
	const categories = /* @__PURE__ */ new Map();
	document.categories.forEach((category, index) => {
		if (categories.has(category.id)) ctx.addIssue({
			code: "custom",
			path: [
				"categories",
				index,
				"id"
			],
			message: `duplicate category id '${category.id}'`
		});
		else categories.set(category.id, category);
	});
	document.categories.forEach((category, index) => {
		if (category.parentId === null) return;
		const parent = categories.get(category.parentId);
		if (parent === void 0) ctx.addIssue({
			code: "custom",
			path: [
				"categories",
				index,
				"parentId"
			],
			message: `unknown parent category '${category.parentId}'`
		});
		else if (parent.workspaceId !== category.workspaceId) ctx.addIssue({
			code: "custom",
			path: [
				"categories",
				index,
				"parentId"
			],
			message: "category parent must belong to the same Workspace"
		});
	});
	document.categories.forEach((category, index) => {
		const visited = /* @__PURE__ */ new Set([category.id]);
		let parentId = category.parentId;
		while (parentId !== null) {
			if (visited.has(parentId)) {
				ctx.addIssue({
					code: "custom",
					path: [
						"categories",
						index,
						"parentId"
					],
					message: `category parent cycle includes '${parentId}'`
				});
				break;
			}
			visited.add(parentId);
			parentId = categories.get(parentId)?.parentId ?? null;
		}
	});
	const assignments = /* @__PURE__ */ new Set();
	document.assignments.forEach((assignment, index) => {
		if (assignments.has(assignment.sessionId)) ctx.addIssue({
			code: "custom",
			path: [
				"assignments",
				index,
				"sessionId"
			],
			message: `duplicate Session assignment '${assignment.sessionId}'`
		});
		assignments.add(assignment.sessionId);
		if (!categories.has(assignment.categoryId)) ctx.addIssue({
			code: "custom",
			path: [
				"assignments",
				index,
				"categoryId"
			],
			message: `unknown assignment category '${assignment.categoryId}'`
		});
	});
	const siblingOrders = /* @__PURE__ */ new Map();
	document.categories.forEach((category, index) => {
		const key = `${category.workspaceId}\u0000${category.parentId ?? ""}`;
		const sibling = siblingOrders.get(key) ?? {
			orders: [],
			indexes: []
		};
		sibling.orders.push(category.order);
		sibling.indexes.push(index);
		siblingOrders.set(key, sibling);
	});
	siblingOrders.forEach(({ orders, indexes }) => {
		if (![...orders].sort((left, right) => left - right).every((order, index) => order === index)) ctx.addIssue({
			code: "custom",
			path: [
				"categories",
				indexes[0] ?? 0,
				"order"
			],
			message: `sibling order must contain every integer in 0..${orders.length - 1}`
		});
	});
	const pendingOperations = /* @__PURE__ */ new Set();
	document.pendingArchive.forEach((pending, index) => {
		if (pendingOperations.has(pending.operationId)) ctx.addIssue({
			code: "custom",
			path: [
				"pendingArchive",
				index,
				"operationId"
			],
			message: `duplicate pending archive operation '${pending.operationId}'`
		});
		pendingOperations.add(pending.operationId);
	});
});
/** Storage domain holding the authoritative Session category document. */
const sessionCategoriesDomainSpec = defineDomain({
	name: "session_categories",
	version: 0,
	global: {
		schema: sessionCategoryDocumentSchema,
		initial: {
			version: 1,
			revision: 0,
			categories: [],
			assignments: [],
			pendingArchive: []
		}
	},
	tables: {}
});
//#endregion
export { sessionCategoriesDomainSpec, sessionCategoryDocumentSchema };
