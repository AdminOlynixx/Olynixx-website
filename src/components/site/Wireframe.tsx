/** Captioned wireframe until a cleared photograph or screenshot exists. */
export function Wireframe({ title, caption }: { title: string; caption?: string }) {
  return (
    <figure className="ol-wireframe">
      <div className="ol-wireframe__frame">
        <p className="ol-wireframe__title">{title}</p>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
