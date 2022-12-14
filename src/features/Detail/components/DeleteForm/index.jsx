import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./styles.scss";

DeleteForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DeleteForm(props) {
  const comment = useSelector((state) => state.comment);
  const { pathname } = useLocation();
  const news = pathname.split("/").slice(3);

  const form = useForm({
    defaultValues: {
      id: comment._id,
      news: news,
    },
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="deleteComment">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="deleteComment__content">
          <p>Bạn có chắc chắn muốn xóa bình luận này.</p>
        </div>

        <Button
          className="dialogButtonDelete"
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress
              className="createComment__progress"
              color="secondary"
            />
          ) : (
            "Xóa"
          )}
        </Button>
      </form>
    </div>
  );
}

export default DeleteForm;
