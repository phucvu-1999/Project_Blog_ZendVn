import {
  ACT_FETCH_COMMENTS_PARENTS,
  ACT_INIT_CHILDREN_PAGING,
  ACT_FETCH_COMMENTS_REPLY,
  ACT_POST_NEW_PARENT_COMMENT,
  ACT_NEW_REPLY_COMMENT,
} from "./action";
import { getDefaultCommentPaging } from "../../helpers";

const initialState = {
  parentPaging: getDefaultCommentPaging(),
  hashChildPaging: {},
};

const reducer = (commentState = initialState, action) => {
  let parentid;
  if (action.type === ACT_FETCH_COMMENTS_PARENTS) {
    return {
      ...commentState,
      parentPaging: {
        ...commentState.parentPaging,
        list:
          action.payload.currentPage === 1
            ? action.payload.comments
            : commentState.parentPaging.list.concat(action.payload.comments),
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        total: action.payload.total,
      },
    };
  }

  if (action.type === ACT_INIT_CHILDREN_PAGING) {
    // input: [ {id: 20}, {id:30} ]
    // output: {id: Paing}

    return {
      ...commentState,
      hashChildPaging: {
        ...commentState.hashChildPaging,
        ...action.payload.comments.reduce((output, commentItem) => {
          // if (commentItem.repluCount > 0) {
          output[commentItem.id] = getDefaultCommentPaging();
          // }

          return output;
        }, {}),
      },
    };
  }

  if (action.type === ACT_FETCH_COMMENTS_REPLY) {
    parentid = action.payload.parentId;

    return {
      ...commentState,
      hashChildPaging: {
        ...commentState.hashChildPaging,
        [parentid]: {
          ...commentState.hashChildPaging[parentid],
          list:
            action.payload.currentPage === 1 &&
            commentState.hashChildPaging[parentid].exclude.length === 0
              ? action.payload.comments
              : commentState.hashChildPaging[parentid].list.concat(
                  action.payload.comments
                ),
          total: action.payload.total,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
        },
      },
    };
  }

  if (action.type === ACT_POST_NEW_PARENT_COMMENT) {
    return {
      ...commentState,
      parentPaging: {
        ...commentState.parentPaging,
        list: [action.payload.comment, ...commentState.parentPaging.list],
        exclude: [
          ...commentState.parentPaging.exclude,
          action.payload.comment.id,
        ],
      },
    };
  }

  if (action.type === ACT_NEW_REPLY_COMMENT) {
    parentid = action.payload.comment.parentId;

    let currentChildrenPaging = commentState.hashChildPaging[parentid];

    if (!currentChildrenPaging) {
      currentChildrenPaging = getDefaultCommentPaging();
    }
    return {
      ...commentState,
      hashChildPaging: {
        ...commentState.hashChildPaging,
        [parentid]: {
          ...currentChildrenPaging,
          list: [...currentChildrenPaging.list, action.payload.comment],
          exclude: [
            ...currentChildrenPaging.exclude,
            action.payload.comment.id,
          ],
        },
      },
    };
  }

  return commentState;
};

export default reducer;
