import axios from "axios";
import download from "download";
import fs from "fs/promises";
import tar from "tar";
import mkdirp from "mkdirp";
import { ncp as ncpCB } from "ncp";
import { Metadata } from "./Metadata";
import { promisify } from "util";

const ncp = promisify(ncpCB);

export async function downloadPackage(name: string, extractTo: string = ".") {
  const url = `https://registry.npmjs.org/${name}`;
  const res = await axios.get(url);
  const data: Metadata = res.data;
  const urlToDL = data.versions[data["dist-tags"].latest].dist.tarball;

  await fs.writeFile("pkg.tgz", await download(urlToDL));
  await tar.extract({
    file: "./pkg.tgz",
  });
  await mkdirp(extractTo);
  await ncp("./package", extractTo);
  await fs.rm("./package", { recursive: true, force: true });
  await fs.rm("./pkg.tgz");
}
