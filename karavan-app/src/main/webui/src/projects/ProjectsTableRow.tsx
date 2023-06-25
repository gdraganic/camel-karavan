import React from 'react';
import {
    Toolbar,
    ToolbarContent,
    ToolbarItem,
    TextInput,
    PageSection,
    TextContent,
    Text,
    Button,
    Modal,
    FormGroup,
    ModalVariant,
    Form,
    Badge,
    Tooltip,
    Bullseye,
    EmptyState,
    EmptyStateVariant,
    EmptyStateIcon,
    Title,
    OverflowMenu,
    OverflowMenuContent,
    OverflowMenuGroup,
    OverflowMenuItem,
    Flex, FlexItem, Radio, Spinner
} from '@patternfly/react-core';
import '../designer/karavan.css';
import {MainToolbar} from "../MainToolbar";
import RefreshIcon from '@patternfly/react-icons/dist/esm/icons/sync-alt-icon';
import PlusIcon from '@patternfly/react-icons/dist/esm/icons/plus-icon';
import {DeploymentStatus, Project} from "./ProjectModels";
import {TableComposable, Tbody, Td, Th, Thead, Tr} from "@patternfly/react-table";
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import CopyIcon from "@patternfly/react-icons/dist/esm/icons/copy-icon";
import {CamelUi} from "../designer/utils/CamelUi";
import {KaravanApi} from "../api/KaravanApi";
import {QuarkusIcon, SpringIcon} from "../designer/utils/KaravanIcons";
import {CamelUtil} from "karavan-core/lib/api/CamelUtil";
import {ProjectEventBus} from "./ProjectEventBus";
import {useDeploymentStatusesStore, useProjectsStore, useProjectStore} from "./ProjectStore";

interface Props {
    config: any,
    project: Project
}

export const ProjectsTableRow = (props: Props) => {

    const {statuses} = useDeploymentStatusesStore()

    function getEnvironments(): string [] {
        return props.config.environments && Array.isArray(props.config.environments) ? Array.from(props.config.environments) : [];
    }

    function getDeploymentByEnvironments(name: string): [string, DeploymentStatus | undefined] [] {
        return getEnvironments().map(e => {
            const env: string = e as string;
            const dep = statuses.find(d => d.name === name && d.env === env);
            return [env, dep];
        });
    }

    const project = props.project;
    const isBuildIn = ['kamelets', 'templates'].includes(project.projectId);
    const badge = isBuildIn ? project.projectId.toUpperCase().charAt(0) : project.runtime.substring(0, 1).toUpperCase();
    return (
        <Tr key={project.projectId}>
            <Td modifier={"fitContent"}>
                <Tooltip content={project.runtime} position={"left"}>
                    <Badge isRead={isBuildIn} className="runtime-badge">{badge}</Badge>
                </Tooltip>
            </Td>
            <Td>
                <Button style={{padding: '6px'}} variant={"link"} onClick={e => {
                    useProjectStore.setState({project: project, operation: "select"});
                    ProjectEventBus.selectProject(project);
                }}>
                    {project.projectId}
                </Button>
            </Td>
            <Td>{project.name}</Td>
            <Td>{project.description}</Td>
            <Td isActionCell>
                <Tooltip content={project.lastCommit} position={"bottom"}>
                    <Badge>{project.lastCommit?.substr(0, 7)}</Badge>
                </Tooltip>
            </Td>
            <Td noPadding style={{width: "180px"}}>
                {!isBuildIn &&
                    <Flex direction={{default: "row"}}>
                        {getDeploymentByEnvironments(project.projectId).map(value => (
                            <FlexItem className="badge-flex-item" key={value[0]}>
                                <Badge className="badge" isRead={!value[1]}>{value[0]}</Badge>
                            </FlexItem>
                        ))}
                    </Flex>
                }
            </Td>
            <Td className="project-action-buttons">
                {!isBuildIn &&
                    <Flex direction={{default: "row"}} justifyContent={{default: "justifyContentFlexEnd"}}
                          spaceItems={{default: 'spaceItemsNone'}}>
                        <FlexItem>
                            <Tooltip content={"Copy project"} position={"bottom"}>
                                <Button variant={"plain"} icon={<CopyIcon/>}
                                        onClick={e => {
                                            useProjectStore.setState({project: project, operation: "copy"});
                                        }}></Button>
                            </Tooltip>
                        </FlexItem>
                        <FlexItem>
                            <Tooltip content={"Delete project"} position={"bottom"}>
                                <Button variant={"plain"} icon={<DeleteIcon/>} onClick={e => {
                                    useProjectStore.setState({project: project, operation: "delete"});
                                }}></Button>
                            </Tooltip>
                        </FlexItem>
                    </Flex>
                }
            </Td>
        </Tr>
    )
}