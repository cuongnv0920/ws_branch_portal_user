import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControlLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Radio,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CKEditorField,
  Input,
  RadioField,
  SelectField,
  TextareaField,
  UploadField,
} from "../../../../components/inputField";
import { categoryApi } from "../../../../api";
import "./styles.scss";
import { useSelector } from "react-redux";

CreateFormNews.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateFormNews(props) {
  const logged = useSelector((state) => state.auth.current);
  const user = logged._id;

  const [categorys, setCategorys] = useState([]);
  const [hot, setHot] = useState(false);
  const [type, setType] = useState("images/new.gif");

  const schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tiêu đề bài viết."),
    category: yup.string().required("Vùi lòng chọn danh mục."),
  });

  const form = useForm({
    defaultValues: {
      title: "",
      type: type,
      category: "",
      user: user,
      file_1: "",
      file_2: "",
      code: "",
      hot: hot,
      command: "",
      content: "",
    },

    resolver: yupResolver(schema),
  });

  const handleChangeHot = (event) => {
    setHot(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  useEffect(() => {
    const fetchCategorys = async () => {
      const categorys = await categoryApi.list();
      setCategorys(categorys);
    };
    fetchCategorys();
  }, []);

  const { isSubmitting } = form.formState;

  return (
    <div className="createNews">
      {isSubmitting && <LinearProgress className="createNews__progress" />}

      <div className="createNews__title dialogTitle">
        <Typography className="dialogTitle_content">
          Thêm bài viết Thông báo chung
        </Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <Input name="title" label="Tiêu đề" form={form} />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <SelectField name="category" label="Danh mục" form={form}>
              {categorys.map((category, index) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <UploadField name="file_1" label="Upload files" form={form} />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <UploadField name="file_2" label="Upload files" form={form} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <SelectField
              name="type"
              onChange={handleChangeType}
              label="Đặc tính"
              form={form}
            >
              <MenuItem value="images/new.gif">New</MenuItem>
              <MenuItem value="images/hot.gif">Hot</MenuItem>
              <MenuItem value="images/khan.gif">Khẩn</MenuItem>
            </SelectField>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <Input name="code" label="Số văn bản" form={form} />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} md={6} sm={12}>
            <RadioField
              name="hot"
              label="Tin tức nổi bật"
              onChange={handleChangeHot}
              value={hot}
              form={form}
            >
              <FormControlLabel
                value={false}
                label="Không"
                control={<Radio />}
              />
              <FormControlLabel value={true} label="Có" control={<Radio />} />
            </RadioField>
          </Grid>
          <Grid item xs={12} md={6} sm={12}></Grid>
        </Grid>

        <TextareaField
          name="command"
          placeholder="Ý kiến chỉ đạo..."
          form={form}
        />

        <CKEditorField name="content" label="Nội dung bài viết:" form={form} />

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default CreateFormNews;