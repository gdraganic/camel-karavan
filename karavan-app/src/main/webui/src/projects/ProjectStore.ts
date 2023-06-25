/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {create} from 'zustand'
import {DeploymentStatus, Project, ProjectFile} from "./ProjectModels";

const projects: Project[] = [];
var project: Project = new Project();
const files: ProjectFile[] = [];
var file: ProjectFile | undefined = undefined;

interface ProjectsState {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
    projects: [],
    setProjects: (ps: Project[]) => {
        set((state: ProjectsState) => ({
            projects: ps,
        }), true);
    },
}))

interface ProjectState {
    project: Project;
    operation: "create" | "select" | "delete" | "none" | "copy";
    setProject: (project: Project, operation:  "create" | "select" | "delete"| "none" | "copy") => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    project: new Project(),
    operation: "none",
    setProject: (p: Project, o: "create" | "select" | "delete"| "none" | "copy") => {
        set((state: ProjectState) => ({
            project: p,
            operation: o,
        }), true);
    },
}))

interface FilesState {
    files: ProjectFile[];
    setFiles: (files: ProjectFile[]) => void;
}

export const useFilesStore = create<FilesState>((set) => ({
    files: [],
    setFiles: (files: ProjectFile[]) => {
        set((state: FilesState) => ({
            files: files,
        }), true);
    },
}))

interface FileState {
    file?: ProjectFile;
    operation: "create" | "select" | "delete" | "none" | "copy";
    setFile: (file: ProjectFile, operation:  "create" | "select" | "delete"| "none" | "copy") => void;
}

export const useFileStore = create<FileState>((set) => ({
    file: undefined,
    operation: "none",
    setFile: (file: ProjectFile, operation:  "create" | "select" | "delete"| "none" | "copy") => {
        set((state: FileState) => ({
            file: file,
            operation: operation,
        }), true);
    },
}))

interface DeploymentStatusesState {
    statuses: DeploymentStatus[];
    setDeploymentStatuses: (statuses: DeploymentStatus[]) => void;
}

export const useDeploymentStatusesStore = create<DeploymentStatusesState>((set) => ({
    statuses: [],
    setDeploymentStatuses: (statuses: DeploymentStatus[]) => {
        set((state: DeploymentStatusesState) => ({
            statuses: statuses,
        }), true);
    },
}))