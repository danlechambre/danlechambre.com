import { Link } from "gatsby";
import React from "react";
import Label from "@components/Label/Label";
import {
  article as articleClass,
  flex,
  item,
  moreLink,
} from "./Article.module.css";
import NavLink from "@components/NavLink/NavLink";
import { getDateString } from "utils";

interface Article {
  // id: string;
  slug: string;
  title: string;
  excerpt: string;
  dateCreated: string;
  dateUpdated?: string;
  inProgress?: boolean;
}

interface ArticleProps {
  article: Article;
}

const Article = ({ article }: any) => {
  return (
    <article className={articleClass}>
      <h2 className="font-lg font-bold mb-1">
        <Link to={`/writing/${article.slug}`}>{article.title}</Link>
      </h2>
      <p className="mb-5 prose">
        {article.excerpt}
        <span className={moreLink}>
          <Link to={`/writing/${article.slug}`}>read more</Link>
        </span>
      </p>
      <footer>
        <ul className={flex}>
          <li className={item}>
            <Label>
              Planted:{" "}
              <time dateTime={article.dateCreated}>
                {getDateString(article.dateCreated)}
              </time>
            </Label>
          </li>
          {article.inProgress && (
            <li>
              <Label variant="primaryCompliment">Still growing</Label>
            </li>
          )}
          {article.dateUpdated && (
            <li>
              <Label variant="primaryCompliment">
                Pruned:{" "}
                <time dateTime={article.dateUpdated}>
                  {getDateString(article.dateUpdated)}
                </time>
              </Label>
            </li>
          )}
        </ul>

        {article.tags && (
          <ul className={flex}>
            {article.tags.map((tag: string) => (
              <li className={item} key={`${tag}-nav-link`}>
                <Label variant="secondary">
                  <Link to={`/writing/tags/${tag}`}>{tag}</Link>
                </Label>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </article>
  );
};

export default Article;
